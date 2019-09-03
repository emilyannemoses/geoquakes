var searchBar = document.querySelector('#search');

searchBar.addEventListener('keyup', function(){
    var val = searchBar.value;
    var lowerVal = val.toLowerCase();
    var targetTerms = document.querySelectorAll('.terms');
    
    Array.prototype.map.call(targetTerms, function(obj) {
        var wordBit = obj.innerHTML.toLowerCase();
        var isIncluded = wordBit.includes(lowerVal);
        if (!isIncluded) {
            var vanish = obj;
            vanish.style.display = 'none';
        } else {
            obj.style.display = 'block';
        }
        return obj.value;
    });
});