function scrambleText() {
    let originalText = document.getElementById('originalText').value;
    let wordsToScramble = document.getElementById('wordsToScramble').value;
    let replacementCharacter = document.getElementById('replacementCharacter').value;
    replacementCharacter


    // let content = prompt('enter text')
    // let scrambleWord = prompt('enter scramble word')
    let words = String(originalText).trim()
    let formattedWord = words.split(" ")
    // let characters = prompt('enter characters')
    
    
    function findTargetWord(wordsToScramble){
    let modifiedWords = (wordsToScramble.trim()).split(' ',)
    return modifiedWords
    }
    
    
    
    let targetWordList = findTargetWord(wordsToScramble)
    console.log(targetWordList)
    console.log(formattedWord)
    
    
    
    function asteriskNumbers(wordLength, replacementCharacter){
        let asteriskArray = new Array()
        for (let i = 1; i <= (wordLength); i++ )
        {  
            asteriskArray.push(replacementCharacter)    
        }
       return asteriskArray.join('')
    }
    
    
    
    function targetWordInList(targetWordList, findTargetWord) {
        let replacedWordArray = []
        let totalScrambledCharacters = 0
        for (let word of formattedWord) {
            if (targetWordList.includes(word)) { 
                var wordLength = word.length
                totalScrambledCharacters  += wordLength
                
                var asteriskNumber = asteriskNumbers(wordLength, replacementCharacter)
                replacedWordArray.push(asteriskNumber) }
            else {
    
                replacedWordArray.push(word)
            }
            
    }    
    // console.log(totalScrambledCharacters)
    document.getElementById('totalScrambledCharacters').innerHTML = `Total scrambled characters:${totalScrambledCharacters}`;
    return replacedWordArray.join(' ')
    };
    
    


    document.getElementById('scrambledText').innerHTML = `Scrambled text: ${targetWordInList(targetWordList, findTargetWord)}`;
    document.getElementById('totalScannedWord').innerHTML = `Total scanned word: ${formattedWord.length}`;
    document.getElementById('totalMatchedWord').innerHTML = `Total matched word: ${targetWordList.length}`;
    
    
    // const scrambledText = targetWordInList(targetWordList, findTargetWord);
    // console.log(scrambledText);
    
    
    // let  totalScannedWord = formattedWord.length;
    // console.log(totalScannedWord);
    
    // let  totalMatchedWord =targetWordList.length;
    // console.log(totalMatchedWord);
    







    

    // let scrambledText = originalText;
    // let totalScrambledCharacters = 0;

    // wordsToScramble.forEach(word => {
    //     let regex = new RegExp(word, 'gi');
    //     scrambledText = scrambledText.replace(regex, match => {
    //         totalScrambledCharacters += match.length;
    //         return '*'.repeat(match.length); 
    //     });
    // });

    // document.getElementById('scrambledText').innerHTML = scrambledText;

    // let stats = `Words scanned: ${originalText.split(/\s+/).length}\n`;
    // stats += `Words matched: ${wordsToScramble.length}\n`;
    // stats += `Characters scrambled: ${totalScrambledCharacters}\n`;


    // document.getElementById('totalScannedWord').innerHTML = totalScannedWord;
    // document.getElementById('totalMatchedWord').innerHTML = totalMatchedWord;
}









