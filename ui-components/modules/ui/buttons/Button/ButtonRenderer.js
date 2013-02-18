define(
    "ui/buttons/Button/ButtonRenderer",
    ['raptor'],
    function(raptor, require) {
        return {
            render: function(input, context) {
                
                var rootAttrs = {};
                
                var classParts = ["btn"];
                
                if (input.variant) {                    
                    classParts.push("btn-" + input.variant);
                }
                
                if (input.size) {                    
                    classParts.push("btn-" + input.size);
                }
                
                
                
                if (input.dynamicAttributes) {
                    if (input.dynamicAttributes.href) {

                    }
                    var className = input.dynamicAttributes["class"];
                    if (className) {
                        delete input.dynamicAttributes["class"];
                        classParts.push(className);
                    }
                    raptor.extend(rootAttrs, input.dynamicAttributes);
                }
                
                rootAttrs["class"] = classParts.join(" ");
                
                var widgetConfig = {};
                
                if (input.toggle) {
                    widgetConfig.toggle = true;
                }
                
                if (input.toggled) {
                    widgetConfig.toggled = true;
                }

                require('raptor/templating').render('ui/buttons/Button', {
                    id: input.id || ('btn' + context.uniqueId()),
                    tag: input, 
                    label: input.label,
                    rootAttrs: rootAttrs,
                    widgetConfig: widgetConfig,
                    isDropdown: input.dropdown === true,
                    href: input.href
                }, context);
            }
        };
    });