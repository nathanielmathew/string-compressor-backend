# string-compressor-backend (ttt)


## The Algorithm
- The current algorithm being used here is a simple algorithm that makes use of the vast range of unicode characters to compress the size of the string
- The compressed string is a string that is replaced by a specific unicode character for each possible pairing of alphabets, thus reducing string size by upto half the original size.
- For Decompression, the reverse of the algorithm is implemented. Thus the each unicode character of the string will be inflated using the respective original character pairing.


## Components Of The Code

### Backend (NodeJS deployed on Heroku)
- Routes for "/" for information to use the API, "/compress/ExampleString" to compress a string called ExampleString and "/decompress/ExampleString" to decompress an example string
- A compression function compress(str) that performs the above algorithm for compression by iterating through the input string str
- A decompression function decompress(str)that performs the above algorithm for decompression by iterating through the input string str
- The API returns an object which contains "str" as the input string, "compressed_str" in the case of compression, and "decompressed_str" in the case of decompression.  

### Frontend (React deployed on Heroku)
- Function GetCompressed(e) that extracts decompressed_str from the JSON object that is returned by the API
- Function GetDecompressed(e) that extracts decompressed_str from the JSON object that is returned by the API
- Both these function display the result on an h3 tag below when the compress / decompress buttons are clicked

## libraries and plugins used
- React
- Express
- cors
- Heroku cli 


## Test cases run
- Strings with lower case alphabets
- Strings with multiple whitespaces
