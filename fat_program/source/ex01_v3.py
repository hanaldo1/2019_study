import os
from slib import sector
from flib import fat

s = sector()
f = fat()

part_arr = []
fat_arr = []
fat_file = []

clear = lambda: os.system('cls')

while True:
	
	print("부웰궤웨루우게ㅜ에루에굴웩 즐거운 뽀뤤쉭 톼임 푸홯ㅎ 쿠황하ㅘㅇ\n")
	print("\n ========== MENU ==========")
	print("\t 1. 파일 열기")
	print("\t 2. 섹터 정보")
	print("\t 3. 파티션 정보")
	print("\t 4. FAT 정보")
	print("\t 5. FAT 파일 정보")
	print("\t 6. 파일 복구")
	print("\t 7. 종료\n")
	
	menu = int(input("[SELECT MENU] : "))

	if menu == 1 : 
		s.menu1()
		# clear()
		
	elif menu == 2 :
		s.menu2()
	elif menu == 3 :
	 	print('\n\n PARTITION \n\n')
	 	s.partition(part_arr, 0)

	elif menu == 4: # fat 파일 시스템
		print('\n\n FAT32 정보 \n\n')
		f.start(part_arr, fat_arr, s)
		print("\n\n")

	elif menu == 5 : # 파일 정보 
	 	f.fat_file_start(fat_arr, fat_file)

	elif menu == 6:
		print('============ file recovery ============\n')
		start_sector = int(input('\t 파일 시작 섹터 번호 : '))
		size = int(input('\t 파일 사이즈(byte) : '))
		name = input('\t 파일 이름 (ex : a.txt) : ')
		f.recover(start_sector, size, name)
		print('\n=============   finish   ==============\n')

	elif menu == 7:
		s.quit() # 종료

	else :
	 	s.quit() # 종료