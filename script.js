// ==UserScript==
// @name         Redirect to CUMTB VPN
// @version      2023.01.13
// @description  CUMTB VPN access for academic sites
// @author       Ranhui@cumtb
// @namespace    https://github.com/Ranhuiryan/cumtb-vpn-script
// @include      *sciencedirect.com/*
// @include      *cnki.net/*
// @include      *springer.com/*
// @include      *nature.com/*
// @include      *ieee.org/*
// @include      *science.org/*
// @include      *wiley.com/*
// @include      *tandfonline.com/*
// @include      *spiedigitallibrary.org/*
// @include      *wanfangdata.com.cn/*
// @include      *peixun.cumtb.edu.cn/*
// @include      *zhdj.cumtb.edu.cn/*
// @include      *ingentaconnect.com/*
// @include      *ascelibrary.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
var vpnHost = "vpn.cumtb.edu.cn"
var vpnPort = 8118

//Create a new URL object from the current page's URL
var url = new URL(location.href);

window.stop(); //Stop loading the current page

if (url.protocol === "http:") {
  url.protocol = "https:"
  if (url.port !== "") {
    // Set the hostname to the current hostname + port + vpnHost
    url.hostname = url.hostname.replace(/\./g, "-") + "-" + url.port + "-p." + vpnHost;
  } else {
    // Set the hostname to the current hostname + vpnHost
    url.hostname = url.hostname.replace(/\./g, "-") + "." + vpnHost;
  }
} else if (url.protocol === "https:") {
  if (url.port !== "") {
    // Set the hostname to the current hostname + "-s-" + port + "-p." + vpnHost
    url.hostname = url.hostname.replace(/\./g, "-") + "-s-" + url.port + "-p." + vpnHost;
  } else {
    // Set the hostname to the current hostname + "-s." + vpnHost
    url.hostname = url.hostname.replace(/\./g, "-") + "-s." + vpnHost;
  }
}

url.port = vpnPort;
location.assign(url.href); //Redirect to the new page
