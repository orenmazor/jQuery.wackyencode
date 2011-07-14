(function($){
    $.fn.wackyencode = function() {
        
        $.each(this,function(){            
            var text = this.innerText;
            //No lower case support here
            text = text.toUpperCase();
        
            //browsers are wacky. they reverse the base calculation, so we reverse ahead of time.
            //it'd be too easy if strings supported the reverse function
            text = text.split('').reverse().join('');
        
            var result = 0;
        
            for(i=0;i<text.length;i++)
            {
                var characterValue = text.charCodeAt(i) - 64;
                result += characterValue * Math.pow(26,i);
            }
            var replacement = "<ol style=\"list-style-type: upper-alpha;\" start=\""+result+"\"><li></li></ol>"
            this.innerHTML = replacement;
        });
    };
    
    //by popular demand (@bengl, ahem), a wacky DECODE function
    $.fn.wackydecode = function() {
        
        $.each(this,function(){
            var lists = $(this).find("ol");
            $.each(lists,function(){
                var value = parseInt($(this).attr("start"));
            
                var string = "";
                while(value != 0)
                {
                    var modulo = value%26;
                    string += String.fromCharCode(modulo + 64);
                    value = (value-modulo)/26;
                }
                string = string.split('').reverse().join('');
                this.innerHTML = string;
            });
        });
    };
})(jQuery);