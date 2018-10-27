function removeInstances(list, checks){
    var out = list.slice(0);
    Logger.log(out);
    list.forEach(
        function (element){
            checks.forEach(
                function (check){
                    //.indexOf(check.toString()) > -1
                    if (check.toString().length > 1 && (element.toString().indexOf(check.toString()) > -1)){
                        //Logger.log(element + "', '" + check.toString() + "' - " + element.toString().indexOf(check.toString()));

                        var index = out.indexOf(element);
                        out.splice(index, 1);


                    }
                    if (check.toString().length > 1){
                        //Logger.log(element + "', '" + check.toString() + "' - " + element.toString().indexOf(check.toString()));
                    }
                }
            );
        }
    );

    return out;
}


function VerifyCalendar(){
    var ui = SpreadsheetApp.getUi();



    var errors = [];

    var alerts = [];

    const ignoreAllert = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calander Settings").getRange("A2:A51").getValues();
    const ignoreError = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Calander Settings").getRange("B2:B51").getValues();


    LineByLine(
        function(line, day, i, j){

            if (line.match(/[A-z]/)){
                line += '-';
                var prof = line.split('>').length;
                var rooms = line.split(')').length;

                var col = columnToLetter(j, i);

                if (prof-1 == 0){
                    alerts.push("Missing Professor at " + day + '.' + col + ': ' + line.split('>')[0] + '\n');
                }

                if (prof-1 > 1){
                    alerts.push("Multiple Professors at " + day + '.' + col + ': ' + line.split('>')[0] + " (Are you missing a semicolon?) \n");
                }

                if (rooms-1 == 0){
                    alerts.push("Missing Room at " + day + '.' + col + ': ' + line.split('>')[0] + '\n');
                }

                if (rooms-1 > 1){
                    alerts.push("Multiple Rooms at " + day + '.' + col + ': ' + line.split('>')[0] + " (Are you missing a semicolon?) \n");
                }
            }

        },

        errors.push
    );

    alerts = removeInstances(alerts, ignoreAllert);

    ui.alert(
        "Calander verified with " + errors.length + " errors:\n- " +
        errors.toString().replace(/[\[,\]]/, '').replace(', ', '\n- ') +

        "\nand " + alerts.length + " alerts:\n- " +
        alerts.toString().replace(/[\[,\]]/, '').replace(', ', '\n- ')
    );
}


function LineByLine(method, callback){
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    days.forEach(
        function (day) {

            sheet = ss.getSheetByName(day);

            if(!sheet){
                callback("Error, missing " + day);
                return;
            }

            var log = [];

            //sheet.getRange("A4:Z4").getValues().filter(String).length;
            var lastYearGroup = lastInRow(2);
            var lastHour = sheet.getRange("A1:A").getValues().filter(String).length;

            for(var i = 4; i <= lastHour; i++){
                for(var j = 2; j <= lastYearGroup; j++){
                    //log.push(sheet.getRange(i, j).getValue());
                    var lines = sheet.getRange(i, j).getValue().split(';').filter(Boolean);

                    lines.forEach(
                        function (line){
                            method(line, day, i, j);
                        }
                    );
                }
            }
        }
    );
}



function columnToLetter(column, row) {
    var temp, letter = '';
    while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
    }
    return letter + row;
}

function lastInRow(row){

    var values = ss.getRange(row, 1, 1, ss.getLastColumn()).getValues();
    var c = 0;
    for (var i = values[0].length - 1; i >= 0; i--){
        if (values[0][i] != "") c++;
    }

    return c;
}