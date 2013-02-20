$rset("rhtml", "/index.rhtml", function(helpers) {
  var empty = helpers.e,
      notEmpty = helpers.ne,
      getTagHandler = helpers.t,
      raptor_templating_taglibs_optimizer_PageTag = getTagHandler("raptor/templating/taglibs/optimizer/PageTag"),
      raptor_templating_taglibs_optimizer_SlotTag = getTagHandler("raptor/templating/taglibs/optimizer/SlotTag"),
      raptor_templating_taglibs_widgets_WidgetTag = getTagHandler("raptor/templating/taglibs/widgets/WidgetTag"),
      raptor_templating_taglibs_widgets_InitWidgetsTag = getTagHandler("raptor/templating/taglibs/widgets/InitWidgetsTag");

  return function(data, context) {
    context.t(
      raptor_templating_taglibs_optimizer_PageTag,
      {
        "name": "index",
        "basePath": "build",
        "templatePath": "/index.rhtml",
        "packageManifest": {"dependencies":[{"type":"module","name":"raptor"},{"type":"module","name":"raptor/widgets"},{"type":"module","name":"demo"}]}
      })
      .w(' <!DOCTYPE html><html><head><title>Widgets Demo | RaptorJS</title>')
      .t(
        raptor_templating_taglibs_optimizer_SlotTag,
        {
          "name": "head"
        })
      .w('</head><body>')
      .t(
        raptor_templating_taglibs_widgets_WidgetTag,
        {
          "jsClass": "test-widgets/ParentWidget",
          "_cfg": data.widgetConfig
        },
        function(widget) {
          context.w('<div w:id="test"></div>');
        })
      .w('<script src="http://code.jquery.com/jquery-1.9.0.js"></script>')
      .t(
        raptor_templating_taglibs_optimizer_SlotTag,
        {
          "name": "body"
        })
      .t(
        raptor_templating_taglibs_widgets_InitWidgetsTag,
        {})
      .w('</body></html>');
  }
});