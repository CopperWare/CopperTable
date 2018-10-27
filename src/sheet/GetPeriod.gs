var periods = [];
var pDic = {};
function GetPeriod(){
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    days.forEach(
        function (day) {

            var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(day);

            if(!sheet){
                callback("Error, missing " + day);
                return;
            }

            var lastHour = sheet.getRange("A1:A").getValues().filter(String).length;

            for(var i = 4; i <= lastHour; i++){

                var lines = sheet.getRange(i, 1).getValue().split(';').filter(Boolean);

                lines.forEach(
                    function (line){

                        var period = parsePeriod(line);

                        var obj = {
                            type: "period",
                            time: period.time,
                            day: day,
                            period: period.period,
                            program: period.program,
                            get: {}
                        };

                        periods.push(obj);

                        pDic[obj.time + obj.program] = obj;
                    }
                );
            }
        }
    );

    return periods;
}

function parsePeriod(line){
    var period = parseInt(line.split(/[\<\(]+/)[0].trim().replace('P', ''));

    var time = line.match(/<(.*?)>/g);
    if (time){
        time = time[0].trim().slice(1, -1).replace(/\s/g, "_").split('-');
    }

    var program = line.match(/\((.*?)\)/g);
    if (program){
        program = program[0].trim().slice(1, -1).replace(/\s/g, "_");
    }else{
        program = defaultTimeProgram;
    }

    return {
        period:period,
        time:time,
        program:program
    }

}