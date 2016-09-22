document.appLauncher = (function (document, window) {

    console.log("app-launcher loaded.");

    function init(containerElement, apps) {

        var table = document.createElement("table");
        table.className = "app-launcher-apps";
        var tr = document.createElement("tr");
        table.appendChild(tr);

        var columns = 5; // todo option.

        apps.forEach(function(app, index) {

            if (index % columns === 0) {
                tr = document.createElement("tr");
                table.appendChild(tr);
            }

            var td = document.createElement("td");
            tr.appendChild(td);

            var a = document.createElement("a");
            a.href = app.href;
            a.title = app.name; // Added because of the ellipses.

            // todo: support images in the future.
            //var img = document.createElement("img");
            //img.src = "http://placehold.it/100x100";
            //a.appendChild(img);

            var div = document.createElement("div");
            var iconLetter = (app.name) ? app.name.substring(0, 1).toLowerCase() : "z";
            div.className = "app-launcher-icon-" + iconLetter
                + " app-launcher-icon-" + app.name.toLowerCase().replace(" ", "-").replace(/\W/g, "");
            var span = document.createElement("span");
            var iconText = document.createTextNode(iconLetter);
            span.appendChild(iconText);
            div.appendChild(span);
            a.appendChild(div);

            var linkText = document.createTextNode(app.name);
            a.appendChild(linkText);
            td.appendChild(a);

        });

        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);
        }
        containerElement.appendChild(table);
    }

    
    /**
     * Use XHR to get the dom of the app list page.
     * @param {} callback 
     * @returns {} 
     */
    function getAppListDom(uri, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(this.responseXML.title);
            callback(this.responseXML);
        }
        xhr.open("GET", uri);
        xhr.responseType = "document";
        xhr.send();
    }

    /**
     * Using a dom, find the app list table and convert into an object.
     */
    function tableDomToAppList(columnNumber, dom) {
        console.log(dom.title);

        var rows = dom.querySelector("table").querySelectorAll("tr");
        var apps = [];

        // start at 1 since the first row is a header.
        for (var index = 1; index < rows.length; index++) {
            var name = rows[index].cells[0].innerText.trim();
            var a = rows[index].cells[columnNumber].querySelector("a");
            var href = (a) ? a.href : "";
            apps.push({ "name": name, "href": href });
        }
        console.log(JSON.stringify(apps));
        return apps;
    }

    /**
     * Get the app list data from a table on a page.
     * To prevent CORS issues: Use relative URL, protocol agnostic (beginning with //), 
     * or "direct" url without redirects.
     * Give the table column number starting with zero.
     * @param {} uri 
     * @param {} columnNumber 
     * @param {} callback 
     * @returns {} 
     */
    function scrapeTable(uri, columnNumber, callback) {
        getAppListDom(uri, function (dom) {
            var appList = tableDomToAppList(columnNumber, dom);
            callback(appList);
        });
    }

    return {
        "init": init,
        "scrapeTable" : scrapeTable
    };

})(document, window);