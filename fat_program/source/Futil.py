from struct import unpack
from info_class import Fat_info

fat_attr = {'1':'Read Only', '2':'Hidden', '4':'System', '8':'Volume Label', '15':'Long File Name', '16':'Directory', '32':'Archieve'}

# check if there is data
def check(e):
	if unpack('>L',e[0:4])[0] == 0 and unpack('>L',e[4:8])[0] == 0 and  unpack('>L',e[8:12])[0] == 0 and  unpack('>L',e[12:16])[0] == 0: 
		return 1       # 데이터가 모두 0인 경우 
	else : return 0 

# convert bytes to unicode
def conv_uni(name): 
	try : 
		return name.decode('euc-kr')
	except:
	 	return name.decode('latin-1')

# calculate date 
def calc_date(b):
	date = [] 
	date.append((b[1]>>1))
	date.append(((b[1]&0x01)<<3) + ((b[0]&0xE0)>>5))
	date.append((b[0]&0x1F))

	# return datetime(year = (date[0]+1980), month = date[1], day = date[2])
	return f'{date[0]+1980}년 {date[1]}월 {date[2]}일'

# calculate time
def calc_time(a):
	time = []
	time.append((a[1]&0xF8)>>3)
	time.append(((a[1]&0x07)<<3) + ((a[0]&0xE0)>>5))
	time.append((a[0]&0x1F))

	# return datetime(hour = time[0], minute = time[1], second = (time[2]*2))
	return f'{time[0]}시 {time[1]}분 {time[2]*2}초'

# calculate data size
def part_size_calc(size):
	size_type=['B','KB','MB','GB']
	tmp = size = size*512
	
	for t in size_type:
		tmp = tmp // 1024
		if tmp > 0 : size = size // 1024
		else : return '%d %s'%(size, t)

# print partition information
def p_print(tmp, p, part_n):
	for j in range(0, 16):
		print("%02X"%tmp[j], end=" ")

	print("\n\n[print int type, except partition type] ")
	print("boot flag : ",p.boot, end='\n')
	print("start chs : ",p.start_chs, end='\n')
	print("partition type : %02X"%p.part_type, end='\n')
	print("end chs : ",p.end_chs, end='\n')
	print("lba start : ",p.part_loc, end='\n')
	print("size : ",part_size_calc(p.part_size), end='\n')
	print('\n\n')


# print fat information
def fat_print(fat_d, VBR):

	print("byte_per_sector : %d"%fat_d.byte_per_sector, end='\n')
	print("sector_per_cluster : %d"%fat_d.sector_per_cluster, end='\n')
	print("reserved_sector_count : %d"%fat_d.reserved_sector_count, end='\n')
	print("total_sector : %d"%fat_d.total_sector, end='\n')
	print("fat_size : %d"%fat_d.fat_size, end='\n')

	print("\n")
	print("VBR start : %d"%VBR, end="\n")
	fat_start = VBR+fat_d.reserved_sector_count
	print("FAT#1 start : %d"%fat_start, end="\n")
	print("FAT#2 start : %d"%(fat_start+fat_d.fat_size), end="\n")
	fat_d.root_directory = fat_start+fat_d.fat_size*2
	print("ROOT Directory start : %d"%fat_d.root_directory, end="\n")
	print("\n\n")

# print file information
def print_fat_file(file, tab): # file(class)
	if file.check_deleted == 229 : print('  Deleted')
	
	if file.attr >=16 and file.attr < 32 : print('  Directory', end='\n')
	elif  file.attr >=32 : print('  Archieve', end='\n')
	else : print("  "+fat_attr[str(file.attr)], end='\n')
	print(f'{tab} name : {file.name}.{file.extend}', end='\n')
	print(f'{tab} Last Written Date : {file.last_written_date}', end='\n')
	print(f'{tab} Last Written Time : {file.last_written_time}', end='\n')
	
	if file.attr != 8:
		print(f'{tab} Create Date : {file.create_date}', end='\n')
		print(f'{tab} Create Time : {file.create_time}', end='\n')
		print(f'{tab} Last Accessed Date : {file.last_accessed_date}', end='\n')
		print(f'{tab} Size : {file.size}', end='\n')
		print(f'{tab} Start Directory : {file.start_directory}', end='\n')
		print(f'{tab} start cluster : {file.start_cluster}', end='\n')

	print('\n')