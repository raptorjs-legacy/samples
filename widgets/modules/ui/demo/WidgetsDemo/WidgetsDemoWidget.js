define(
    "ui/demo/WidgetsDemo/WidgetsDemoWidget",
    function(require) {

        var WidgetsDemoWidget = function(config) {
            var redGreenBlueButton = this.widgets.redGreenBlueButton,
                cyanMagentaYellowButton = this.widgets.cyanMagentaYellowButton,
                repeatedButtons = this.widgets.repeatedButtons;

            this.$("#changeColorsButton").click(function() {
                redGreenBlueButton.nextColor();
                cyanMagentaYellowButton.nextColor();
                repeatedButtons.forEach(function(curButton) {
                    curButton.nextColor();
                });
            });
        };
        
        WidgetsDemoWidget.prototype = {
        };
        
        return WidgetsDemoWidget;
    });