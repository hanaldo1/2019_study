#from optparse import OptionParser
import optparse
from sys import argv
from option import fuz_usage
import os
import utils
from os import *
from pydbg import *
from pydbg.defines import *
from random import choice
from threading import *
import time
from tqdm import *

class Fuzz():
    def __init__(self, options):
        self.dbg = None
        self.pid = None
        self.running = False
        self.in_crashHandler = False
        self.target = options.target_program
        self.input_directory = options.file_directory
        self.ext = options.extension

        # extract file list with extension user entered in directory user entered
        file_list = os.listdir(self.input_directory)
        self.file_list = [file for file in file_list if file.endswith(self.ext)] 

        self.test_count = options.test_count 
        self.iter = 0

        if path.isdir(options.log_directory) != True:
            os.mkdir(options.log_directory)
        self.report_directory = options.log_directory

    def start(self):
        while True :
            if not self.running :
                # start fuzzer
                fThread = Thread(target = self.fuzzThread)
                fThread.start()

                while self.pid == None:
                    time.sleep(1)

                mThread = Thread(target = self.monitorThread)
                mThread.start()

                self.iter += 1

            else:
                while self.running : time.sleep(1)
        

    def fuzzThread(self):
       
        print "[*] start fuzzer ------ count %d"%self.iter

        self.running = True
        self.dbg = pydbg()
        self.dbg.set_callback(EXCEPTION_ACCESS_VIOLATION, self.check_accessv)

        file_path = "\""+self.input_directory +"/"+ choice(self.file_list)+"\""

        self.dbg.load(self.target, file_path)
        self.pid = self.dbg.pid
        self.dbg.run()

    
    def monitorThread(self):

        # waitingd
        for i in tqdm(range(3), desc= "waiting", total=3):
            time.sleep(1)

        if self.in_crashHandler != True :
            time.sleep(1)
            self.dbg.terminate_process()
            self.pid = None
            self.running = False

        else :
            print "[*] crashHandler is busy \n" 
            while self.running: sleep(1)
        

    def check_accessv(self, dbg):
        if dbg.dbg.u.Exception.dwFirstChange:
            return DBG_EXCEPTION_NOT_HANDLED
        
        print "[*] CRASH! ----------------- \n"
        self.in_crashHandler = True
        crash_bin = utils.crash_binning.crash_binning()
        crash_bin.record_crash(dbg)
        
        # information of crash and write log file 
        crash = crash_bin.crash_synopsis()
        print crash

        self.dbg.terminate_process()
        self.in_crashHandler = False
        self.running = False

        return DBG_EXCEPTION_NOT_HANDLED


if __name__ == "__main__":
    fuz_options = fuz_usage(argv)
    fuzzer = Fuzz(fuz_options)
    fuzzer.start()
