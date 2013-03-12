define(
    'taglibs/app/HelloTag', 
    function(require) {
        return {
            render: function(input, context) {
                context.write('Hello ' + input.name + "! You have " + input.count + " new messages.");
            }
        }
    });