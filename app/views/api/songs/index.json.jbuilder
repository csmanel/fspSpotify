json.array! @songs do |song|
  json.extract! song, :duration, :name 
  #do i need artist id/album id? 
  # will i need the future song things? like its icon/img
end