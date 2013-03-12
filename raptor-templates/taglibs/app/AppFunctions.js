define(
    'taglibs/app/AppFunctions', 
    function(require) {
        return {
            upperCase: function(o) {
                return o ? o.toString().toUpperCase() : '';
            },
            reverse: function(str) {
                var out = "";
                for (var i=str.length-1; i>=0; i--) {
                    out += str.charAt(i); 
                }
                return out;
            }
        }
    });