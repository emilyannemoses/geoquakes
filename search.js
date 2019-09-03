const searchBar = document.querySelector('#search');

searchBar.addEventListener('keyup', function(){
    let val = searchBar.value;
    const lowerVal = val.toLowerCase();
    const targetTerms = document.querySelectorAll('.terms');
    
    Array.prototype.map.call(targetTerms, function(obj) {
        let wordBit = obj.innerHTML.toLowerCase();
        const isIncluded = wordBit.includes(lowerVal);
        if (!isIncluded) {
            let vanish = obj;
            vanish.style.display = 'none';
        } else {
            obj.style.display = 'block';
        }
        return obj.value;
    });
});