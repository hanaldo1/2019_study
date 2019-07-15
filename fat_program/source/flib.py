#_*_coding: utf-8_*_

from struct import unpack
from datetime import datetime
import os 
from os import path
from Futil import * 
from info_class import File_info, Fat_info


class fat():
	def __init__(self):
		self.f = 0
		self.up_dir = 0
		self.isUpDir = False

	def start(self, part_arr, fat_arr, s):
		self.f = s.f
		if not part_arr : 
			print("파티션 정보를 먼저 불러오세요")
			return 
	
		for part_n, partition in enumerate(part_arr):
			if partition.part_type == 12: # partition type == 0c
				fat_d = Fat_info(part_n+1)

				offset = partition.part_loc*512
				self.f.seek(offset)

				byte = self.f.read(90)
				fat_d.fat_info_save(byte)
				fat_arr.append(fat_d)

				print("partition [%d] ==========================="%(part_n+1), end="\n\n")
				fat_print(fat_d, partition.part_loc)	


	def fat_file_start(self, fat_arr, fat_file):
		if not fat_arr:
			print("fat 정보를 먼저 불러오세요")
			return 

		for fat in fat_arr:
			print(f'파일 정보(root directory sector number : {fat.root_directory})', end='\n\n')
			print(f'  partition {fat.partition_number} ------------------ ', end='\n')
			self.fat_file_info(fat.root_directory, fat.sector_per_cluster, fat_file)


	def fat_file_info(self, root_addr, secPclu, fat_file, start_cluster=2):
		offset = root_addr * 512
		self.f.seek(offset)

		while True:
			file = self.f.read(32) # read 2 lines
			if check(file): 
				self.isUpDir = False
				self.f.seek(self.up_dir)
				break
			
			tab = '\t\t' if self.isUpDir == True else '\t'
			file_attr = file[11]
			file_info = File_info()

			if file_attr == 15 : 
				self.long_file(file, fat_file, root_addr, secPclu, start_cluster)
			
			elif file_attr >= 16 and file_attr < 32 and file[0] != 229 and file_attr != 22:
				file_info.save(file, '', root_addr, secPclu, start_cluster)
				fat_file.append(file_info)
				print_fat_file(file_info, tab)

				if file_info.name != '.       ' and file_info.name != '..      ' :
					self.up_dir = self.f.tell()
					self.isUpDir = True
					self.fat_file_info(file_info.start_directory, secPclu, fat_file, file_info.start_cluster)

			else :
				file_info.save(file, '', root_addr, secPclu, start_cluster)
				fat_file.append(file_info)
				print_fat_file(file_info, tab)	


	def long_file(self, b_file, fat_file, root_addr, sector_per_cluster, start_cluster=2):
		l = [b_file]
		name_seq = []
		tab = '\t\t' if self.isUpDir == True else '\t'
		
		while True:
			long_file = self.f.read(32)
			l.append(long_file)

			if long_file[11] == 15 : 
				name_seq.append([long_file[1:11]+long_file[14:26]+long_file[28:32], long_file[0]])
				continue
			break

		name_seq.append([l[-1][0:7],l[-1][0]])
		name_seq.sort(key = lambda x:x[1])
		name = ''

		for i in name_seq:
			name += conv_uni(i[0])

		file_info = File_info()
		file_info.save(l[-1], '', root_addr, sector_per_cluster, start_cluster)
		fat_file.append(file_info)

		print('  Long File Name')
		print_fat_file(file_info, tab)

		return 


	def recover(self, start_sector, size, name):
		fullpath = './recovered'

		if path.isdir('./recovered/') != True:
			fullpath = './recovered'
			os.mkdir(fullpath)

		fullpath = path.join(fullpath, name)
		recovFile = open(fullpath, "wb")
		
		self.f.seek(start_sector*512)
		data = self.f.read(size)

		recovFile.write(data)
		recovFile.close()