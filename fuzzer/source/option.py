from optparse import OptionParser
from sys import argv

def fuz_usage(args):
    parser = OptionParser()
    parser.add_option("-p", "--program", dest="target_program", help="target program to do fuzzing test")
    parser.add_option("-d", "--file_directory", dest="file_directory", help="a directory of input file")
    parser.add_option("-C", "--test_count", dest="test_count", help="count of test")
    parser.add_option("-L", "--log_directory", dest="log_directory", help="a directory that logging file will be located")
    parser.add_option("-e", "--extension", dest="extension", help="an extension of input file")
    (options, args) = parser.parse_args(args)
    
    return options

def mut_usage(args):
    parser = OptionParser()
    parser.add_option("-s", '--size',  dest="mutate_size", help="size of mutation   ex) -s 4 : it means 4byte or 4 lines")
    parser.add_option("-u", '--unit', dest="mutate_unit", default="byte", help="unit of mutation, default value is byte ex) -t byte ")
    parser.add_option("-n", '--mutate_num', dest="mutate_number", help="the number of out file    ex) -c 3 : it create 3 out file")
    parser.add_option("-f", "--sample_file", dest="sample_file", help="sample file to mutate")
    parser.add_option("-o", "--out_directory", dest="out_directory", default="./sample/", help="a directory that output file will be located, default is sample/  ex) -o ./log/")
    (options, args) = parser.parse_args(args)

    return options