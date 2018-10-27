
function IterateSelection(method) {
    var range = SpreadsheetApp.getActiveSheet().getActiveRange();
    var numRows = range.getNumRows();
    var numCols = range.getNumColumns();
    var writeValues = []
    for (var i = 1; i <= numRows; i++) {
        var row = []
        for (var j = 1; j <= numCols; j++) {
            var currentValue = range.getCell(i,j).getValue();
            var withString = method(currentValue);
            row.push(withString);
        }
        writeValues.push(row);
    }
    range.setValues(writeValues);
}

function regexProf(match){
    return " <" + match.replace(/- /g, '').trim() + "> ";
}

function StandardizeProf(){
    IterateSelection(
        function (value) {
            return value.replace(/ - [A-z]*/g, regexProf);
        }
    );
}

function StandardizeSemicollon() {
    IterateSelection(
        function (value) {

            value = value.replace(/>  /g, ">;");
            value = value.replace(/> ?\n/g, ">;")
            value = value.replace(/> ?\n? ?$/g, ">;")

            value = value.replace(/\)  /g, ");");
            value = value.replace(/\) ?\n/g, ");")
            value = value.replace(/\) ?\n? ?$/g, ");")
            return value
        }
    );
}

function StandardizeNewline() {
    IterateSelection(
        function (value) {

            value = value.replace(/\s{3,}/g, "\n");
            return value
        }
    );
}