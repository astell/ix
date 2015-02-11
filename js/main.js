
requirejs.config({
  baseUrl: ix.jsPath,
  map: {
    "uri": { // fixes URI deps
      "IPv6": "false",
      "punycode": "false",
      "SecondLevelDomains": "false"
    }
  }
});

// Start the main app logic.
requirejs([
    ix.jsPath + 'reveal.js/plugin/markdown/marked.js',
    ix.jsPath + 'jquery/jquery.js',
    ix.jsPath + 'underscore/underscore.js',
    ix.jsPath + 'underscore.string/underscore.string.js',
    ix.jsPath + 'MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    ix.jsPath + 'reveal.js/plugin/highlight/highlight.js'
  ],
  function (marked, jq, u, s) {

    function go () {
      ix.slurpMarkdown();
      ix.doHighlight();
      ix.slurpCode();
    }

    _.mixin(s.exports());
    window.marked = marked; // overwrite
    $(document).ready(function () {
      var qs = window.location.href.match(/\?(.*)?src=(.*)/);
      if (qs) {
        var url = qs[2];
        $.get(url, function (data) {
          var body = $('body')[0];
          body.innerHTML = '';
          if (url.match(/.*\.md$/)) { // ends with md
            var div = document.createElement( "div" );
            var script = document.createElement( "script");
            script.setAttribute('type', 'text/x-markdown');
            script.innerHTML = data;
            $(div).append(script);
            $(body).append(div);
          } else {
            body.innerHTML = data;
          }
          go();
        });
      } else {
        go();
      }
    });
  }
);
