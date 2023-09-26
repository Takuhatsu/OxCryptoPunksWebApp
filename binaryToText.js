function binaryToText(binaryBytecode) {
    // Split the binary string into 8-bit chunks
    const binaryChunks = binaryBytecode.match(/.{8}/g);
  
    // Convert each binary chunk to a decimal number and then to a character
    const text = binaryChunks.map(binaryChunk => {
      const decimalValue = parseInt(binaryChunk, 2);
      return String.fromCharCode(decimalValue);
    });
  
    // Join the characters to form the text
    return text.join('');
  }
  
  const binaryBytecode = "01001111011110000100001101110010011110010111000001110100011011110101000001110101011011100110101101110011";
  const text = binaryToText(binaryBytecode);
  console.log(text);