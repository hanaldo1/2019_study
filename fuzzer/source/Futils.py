# chr(i) 0 <= i <= 1114111
from random import randrange

def create_data(size):
    text=''
    for i in range(size):
        text+=chr(randrange(255))
    
    return text

def byte_insert(count, file_size, sample_file, size = 16):
    for i in range(count):    
        offset = randrange(file_size - size)
        input_text = create_data(size)
        sample_file = sample_file[:offset] + input_text + sample_file[offset:]
    
    return sample_file

def byte_replace(count, file_size, sample_file, size = 16):
    for i in range(count): 
        offset = randrange(file_size - size)
        offset_2 = randrange(file_size - size)
        tmp = sample_file[offset : offset + size]
        sample_file = sample_file[ : offset ] + sample_file[offset_2 : offset_2 + size] + sample_file[offset + size : ]
        sample_file = sample_file[ : offset_2] + tmp + sample_file[offset_2 + size : ]
    
    return sample_file

def byte_remove(count, file_size, sample_file, size = 16):
    for i in range(count): 
        offset = randrange(file_size - size)
        sample_file = sample_file[:offset]+sample_file[offset+size:]

    return sample_file

def byte_append(count, file_size, sample_file, size = 16):
    for i in range(count): 
        input_text = create_data(size)
        sample_file = sample_file[0:]+input_text

    return sample_file

# def flipped(sample_file): return sample_file[:-1]