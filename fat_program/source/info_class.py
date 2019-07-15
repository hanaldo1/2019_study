from struct import unpack
import Futil

# partition information
class partition :
	def __init__(self):
		self.boot = 0
		self.start_chs = ''
		self.part_type = 0
		self.end_chs = ''
		self.part_loc = 0
		self.part_size = 0

	def save(self, tmp, n_loc):
		self.boot=tmp[0]
		self.start_chs = unpack('<L',(tmp[1:4]+b'\x00'))[0]
		self.part_type = tmp[4]
		self.end_chs = unpack('<L',(tmp[5:8]+b'\x00'))[0]
		self.part_loc = unpack('<L',tmp[8:12])[0] + n_loc
		self.part_size = unpack('<L',tmp[12:16])[0]

# fat information each partition
class Fat_info:
	def __init__(self, partition_number):
		self.partition_number = partition_number
		self.byte_per_sector = 0
		self.sector_per_cluster = 0
		self.reserved_sector_count = 0
		self.total_sector = 0
		self.fat_size = 0
		self.root_directory = 0

	def fat_info_save(self, b):
		self.byte_per_sector = unpack('<H',b[11:13])[0]
		self.sector_per_cluster = b[13]
		self.reserved_sector_count = unpack('<H',b[14:16])[0]
		self.total_sector = unpack('<L',b[32:36])[0]
		self.fat_size = unpack('<L',b[36:40])[0]

# file information each partition
class File_info:
	def __init__(self):
		self.check_deleted = 0
		self.name = ''
		self.extend = ''
		self.attr = 0
		self.create_date = ''
		self.create_time = ''
		self.last_written_date = ''
		self.last_written_time = ''
		self.last_accessed_date = ''
		self.size = 0
		self.start_directory = 0

	def save(self, file, name, root_addr, sector_per_cluster, start_cluster=2):
		self.check_deleted = file[0]
		self.name = Futil.conv_uni(file[0:8]) if name == '' else name
		self.extend = Futil.conv_uni(file[8:11])
		self.attr = file[11]
		self.create_date = Futil.calc_date(file[16:18])
		self.create_time = Futil.calc_time(file[14:16])
		self.last_written_date = Futil.calc_date(file[24:26])
		self.last_written_time = Futil.calc_time(file[22:24])
		self.last_accessed_date = Futil.calc_date(file[18:20])
		self.size = unpack('<L',file[28:32])[0]
		self.start_cluster = unpack('<L',file[26:28]+file[20:22])[0]
		self.start_directory = root_addr + ((self.start_cluster-start_cluster)*sector_per_cluster)
