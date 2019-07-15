import os
from struct import unpack
from Futil import check, part_size_calc, p_print
from info_class import partition

class sector:
	def __init__(self):
		self.filepath = '' # 파일 이름(경로)
		self.sector_cnt = 0 # 섹터 개수
		self.f = 0 # 오픈한 파일 객체 
		self.base = 0 # 확장 파티션 기준 주소

	# menu 1 
	# file open
	def menu1(self):
		try:
			self.filepath = input("INPUT FILE PATH : ")	# 파일 이름 입력
			
			self.f = open(self.filepath,'rb')
			filesize = os.path.getsize(self.filepath)
			self.sector_cnt = filesize // 512

			print('\nSUCCESS FILE OPEN \n\n')

		except :
			print("\nFILE OPEN ERROR \n\n")
			return

	# menu 2
	# print sector 
	def menu2(self):
		sector_cnt = self.sector_cnt

		if self.filepath != '': # 파일 이름이 없으면(파일을 오픈하지 않았으면)
			f = self.f

			while True:
				print('\n[FILE NAME] : %s \n'%self.filepath)
				print('if your input is under 0 or over %d, exit'%(sector_cnt-1)) # 0부터 시작하므로 섹터 범위는 0 ~ (섹터개수 -1))
				sector_n = int(input("섹터 [0-%d] : "%(sector_cnt-1)))	

				if  sector_n < 0 or sector_n > sector_cnt: # 입력이 섹터 범위를 벗어나면 이전 메뉴로 돌아감
					print('no exist %d sector'%sector_n)
					return
		
				print("offset(h)  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F")
				print("==========================================================")	

				offset = 512*sector_n # 시작할 오프셋
				f.seek(offset) # 입력한 섹터 위치로 이동(512 * 섹터 넘버)
				byte = f.read(512)

				# 16바이트씩 32줄 출력 (16*32 = 512(한 섹터 크기))
				for i in range(0,32):
					asciii = ""
					print("%08X"%offset, end="   ")
					for j in range(0,16):
						b = byte[16*i+j]
						asciii += chr(b) if b >= 33 and b <= 127 else "."
						print("%02X"%b, end=" ")

					offset += 16
					print(asciii)
				print('\n\n')

		else : 
			print('파일을 먼저 열어주세요\n\n')
			return 

	# exit
	def quit(self):
		print('QUIT')
		exit(1)

	# menu 3
	# partition 
	def partition(self, part_arr, part_n): 
		self.f.seek(446)
		byte = self.f.read(64)

		tmp = []
		for i in range(4):
			tmp.append(byte[i*16 : i*16+16])

		for i, e in enumerate(tmp):
			if check(e): return
			
			p = partition()
		
			if e[4] == 5 or e[4] == 15 : # type of partition 
				lba = unpack('<L',e[8:12])[0]
				self.base = lba # 기준 주소 저장
				self.partition_E(part_arr, lba, 0, part_n)
			else :
				print("partition [%d] : "%(part_n+1), end=" ") 
				p.save(e, 0)
				part_arr.append(p) 
			
				p_print(e, p, part_n)
				part_n += 1
		
	def partition_E(self, part_arr, lba, base, part_n):
		n_loc = lba+base
		self.f.seek(n_loc*512+446)
		byte = self.f.read(64)

		tmp = []
		for i in range(2):
			tmp.append(byte[i*16 : i*16+16])

		for i, e in enumerate(tmp):
			if check(e): return
			
			p = partition()
			if e[4] == 5 or e[4] == 15 : # type of partition 
				lba = unpack('<L',e[8:12])[0]
				self.partition_E(part_arr, lba, self.base, part_n)
			else :
				print("partition [%d] : "%(part_n+1), end=" ") 
				p.save(e, n_loc) # save to class
				part_arr.append(p) 
			
				p_print(e, p, part_n) # print partition's information
				part_n += 1
	