// ==UserScript==
// @name         Redirect to CUMTB VPN
// @version      2023.01.13
// @description  CUMTB VPN access for academic sites
// @author       Ranhui@cumtb
// @namespace    https://greasyfork.org/en/users/30-opsomh
// @include      *sciencedirect.com/*
// @include      *cnki.net/*
// @include      *springer.com/*
// @include      *nature.com/*
// @include      *ieee.org/*
// @include      *science.org/*
// @include      *wiley.com/*
// @include      *tandfonline.com/*
// @include      *wanfangdata.com.cn/*
// @grant        none
// @inject-into  auto
// @run-at       document-start
// ==/UserScript==
var vpnurl = "vpn.cumtb.edu.cn"
var vpnport = 8118

//Create a new URL object from the current page's URL
var url = new URL(location.href);

window.stop(); //Stop loading the current page

if (url.protocol === "http:") {
  url.protocol = "https:"
  if (url.port !== "") {
    // Set the hostname to the current hostname + port + vpnurl
    url.hostname = url.hostname.replace(/\./g, "-") + "-" + url.port + "-p." + vpnurl;
  } else {
    // Set the hostname to the current hostname + vpnurl
    url.hostname = url.hostname.replace(/\./g, "-") + "." + vpnurl;
  }
} else if (url.protocol === "https:") {
  if (url.port !== "") {
    // Set the hostname to the current hostname + "-s" + port + "-p." + vpnurl
    url.hostname = url.hostname.replace(/\./g, "-") + "-s" + "-" + url.port + "-p." + vpnurl;
  } else {
    // Set the hostname to the current hostname + "-s." + vpnurl
    url.hostname = url.hostname.replace(/\./g, "-") + "-s." + vpnurl;
  }
}

url.port = vpnport;
location.assign(url.href); //Redirect to the new page
