var respecConfig = {
  // specification status (e.g. WD, LCWD, NOTE, etc.). If in doubt use ED.
  specStatus:           "ED",

  // the specification's short name, as in http://www.w3.org/TR/short-name/
  shortName:            "webrtc",
  useExperimentalStyles: true,

  // if your specification has a subtitle that goes below the main
  // formal title, define it here
  // subtitle   :  "an excellent document",

  // if you wish the publication date to be other than today, set this
  // publishDate:  "2014-01-27",

  // new ability to override the copyright completely
  overrideCopyright:  "<p class='copyright'>Initial Author of this Specification was Ian Hickson, Google Inc., with the following copyright statement:<br /> &#169; Copyright 2004-2011 Apple Computer, Inc., Mozilla Foundation, and Opera Software ASA. You are granted a license to use, reproduce and create derivative works of this document.</p> <p class='copyright'>All subsequent changes since 26 July 2011 done by the W3C WebRTC Working Group are under the following <a href='http://www.w3.org/Consortium/Legal/ipr-notice#Copyright'>Copyright</a>:<br />&#169; 2011-2015 <a href='http://www.w3.org/'><abbr title='World Wide Web Consortium'>W3C</abbr></a><sup>&#174;</sup> (<a href='http://www.csail.mit.edu/'><abbr title='Massachusetts Institute of Technology'>MIT</abbr></a>, <a href='http://www.ercim.eu/'><abbr title='European Research Consortium for Informatics and Mathematics'>ERCIM</abbr></a>, <a href='http://www.keio.ac.jp/'>Keio</a>, <a href='http://ev.buaa.edu.cn/'>Beihang<\/a>). <a href='http://www.w3.org/Consortium/Legal/copyright-documents'>Document use</a>  rules apply.</p> <p class='copyright'>For the entire publication on the W3C site the <a href='http://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer'>liability</a> and <a href='http://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks'>trademark</a> rules apply.</p>",


  // if the specification's copyright date is a range of years, specify
  // the start date here:
  // copyrightStart: "2005",

  // if there is a previously published draft, uncomment this and set its YYYY-MM-DD
  prevED: "https://w3c.github.io/webrtc-pc/archives/20151123/webrtc.html",

  // if there a publicly available Editor's Draft, this is the link
  edDraftURI: "http://w3c.github.io/webrtc-pc/",

  // if this is a LCWD, uncomment and set the end of its review period
  // lcEnd: "2009-08-05",

  // if you want to have extra CSS, append them to this list
  // it is RECOMMENDED that the respec.css stylesheet be kept
  //        extraCSS:             ["ReSpec.js/css/respec.css"],
  //        extraCSS:             ["../../../2009/dap/ReSpec.js/css/respec.css"],

  // editors, add as many as you like
  // only "name" is REQUIRED
  editors:  [
    //              { name: "Your Name", url: "http://example.org/",
    //                company: "Your Company", companyURL: "http://example.com/" },
    { name: "Adam Bergkvist", company: "Ericsson" },
    { name: "Daniel C. Burnett", company: "Invited Expert" },
    { name: "Cullen Jennings", company: "Cisco" },
    { name: "Anant Narayanan", company: "Mozilla (until November 2012)" },
    { name: "Bernard Aboba", company: "Microsoft Corporation" }
  ],

  // authors, add as many as you like.
  // This is optional, uncomment if you have authors as well as editors.
  // only "name" is REQUIRED. Same format as editors.

  //authors:  [
  //    { name: "Your Name", url: "http://example.org/",
  //      company: "Your Company", companyURL: "http://example.com/" }
  //],

  // name of the WG
  wg:           "Web Real-Time Communications Working Group",

  // URI of the public WG page
  wgURI:        "http://www.w3.org/2011/04/webrtc/",

  // name (without the @w3c.org) of the public mailing to which comments are due
  wgPublicList: "public-webrtc",

  // URI of the patent status for this WG, for Rec-track documents
  // !!!! IMPORTANT !!!!
  // This is important for Rec-track documents, do not copy a patent URI from a random
  // document unless you know what you're doing. If in doubt ask your friendly neighbourhood
  // Team Contact.
  wgPatentURI:  "http://www.w3.org/2004/01/pp-impl/47318/status",
  issueBase: "https://github.com/w3c/webrtc-pc/issues/",
  otherLinks: [
    {
      key: "Participate",
      data: [
        {
          value: "Mailing list",
          href: "http://lists.w3.org/Archives/Public/public-webrtc/"
        },
        {
          value: "Browse open issues",
          href: "https://github.com/w3c/webrtc-pc/issues"
        },
        {
          value: "IETF RTCWEB Working Group",
          href: "https://tools.ietf.org/wg/rtcweb/"
        }
      ]
    }
  ],
  useExperimentalStyles: true,
    localBiblio: {
        "JSEP": {
            "authors":["Justin Uberti","Cullen Jennings","Eric Rescorla"],
            "href": "http://datatracker.ietf.org/doc/draft-ietf-rtcweb-jsep/",
            "publisher": "IETF",
            "status": "Active Internet-Draft",
            "title": "Javascript Session Establishment Protocol",
            "date": "18 October 2015"
        }
    },
   postProcess: [
       function() {
           /* waiting for https://github.com/w3c/respec/pull/547 to land */
           var dc = document.querySelectorAll("code[id]");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.removeAttribute("id");
           }
           var dc = document.querySelectorAll("[href^='#dom-datachannel-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCDataChannel");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCDataChannelInit-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCDataChannelInit");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCCertificate-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCCertificate");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCIdentityProvider-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCIdentityProvider");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCSessionDescription-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCSessionDescription");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-datachannelevent-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCDataChannelEvent");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-RTCDTMFSender-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCDTMFSender");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-peerconnection-'],[href^='#widl-RTCPeerConnection']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCPeerConnection");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-icetransport-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCIceTransport");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCIceCandidate-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCIceCandidate");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCPeerConnectionIceEvent-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCPeerConnectionIceEvent");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-dtlstransport-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCDTLSTransport");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-rtcstats-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCStats");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-rtpsender-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCRtpSender");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-trackevent-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCTrackEvent");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#widl-RTCConfiguration-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCConfiguration");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[href^='#dom-tonechangeevent-']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.setAttribute("data-for", "RTCDTMFToneChangeEvent");
               el.removeAttribute("href");
           }
           var dc = document.querySelectorAll("[title='']");
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               el.removeAttribute("title");
           }
           var dc = document.querySelectorAll("[href^='#']");
           var ignoreSectionIds = ['session-negotiation-model', 'isolated-pc'];
           for (var i = 0 ; i < dc.length; i++) {
               var el = dc[i];
               if (!el.getAttribute("href").match(/^#sec\./) && ignoreSectionIds.indexOf(el.getAttribute("href").split('#')[1]) === -1) {
                   el.removeAttribute("href");
               }
           }
       }
   ]
};
