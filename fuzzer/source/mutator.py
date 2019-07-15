import os
from os import path
from option import mut_usage
from sys import argv
from random import randrange, choice
from operator import eq
from Futils import *

class Mutator(): 
    def __init__(self, options):
        self.size = int(options.mutate_size)
        self.num = int(options.mutate_number)
        self.unit = options.mutate_unit

        if path.isdir(options.out_directory) != True:
            os.mkdir(options.out_directory)
        self.out_directory = options.out_directory    
        
        try:
            sample = open(options.sample_file, "rb")
        except:
            print("[*] sample file open failed")
            exit(1)

        self.sample_file = sample
        self.sample_file_name = options.sample_file

    def start(self):
        for i in range(self.num):
            count = 0
            mutate_type = choice(['insert','replace','remove','append'])
            ext = path.splitext(self.sample_file_name)[-1]
            sample_name = path.split(self.sample_file_name)[-1]
            full_path = path.join(self.out_directory, 'mut_{0}_{1}{2}'.format(path.splitext(sample_name)[0], i, ext))

            # if eq(self.unit, 'byte'):
            self.mutate(mutate_type, self.unit, self.size, self.sample_file, self.out_directory, full_path)
            # else : 
            #     self.mutate(None, self.size, self.sample_file, self.out_directory, full_path)


    def mutate(self, mtype, unit, size, sample, out_d, full_path):
        f = open(full_path, "wb")
        sample.seek(0)
        sample_file = sample.read()
        file_size = path.getsize(self.sample_file_name)
        IsByte = True if eq(unit, 'byte') else False
        count = 1 if IsByte else size

        if eq(mtype, "insert") : 
            sample_file = byte_insert(count, file_size, sample_file, self.size) if IsByte else byte_insert(count, file_size, sample_file) 

        elif eq(mtype, "replace") :
            sample_file = byte_replace(count, file_size, sample_file, self.size) if IsByte else byte_replace(count, file_size, sample_file)

        elif eq(mtype, "remove"): 
            sample_file = byte_remove(count, file_size, sample_file, self.size) if IsByte else byte_remove(count, file_size, sample_file)
            
        elif eq(mtype, "append"):
            sample_file = byte_append(count, file_size, sample_file, self.size) if IsByte else byte_append(count, file_size, sample_file)
        # else : sample_file = flipped(sample_file)

        f.write(sample_file)
        
if __name__ == "__main__":
    mut_options = mut_usage(argv)
    mutator = Mutator(mut_options)
    mutator.start()