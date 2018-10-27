var students = [];

function GetStudents(){
    const years = ['MYP4', 'MYP5', 'DP1', 'DP2'];

    years.forEach(
        function (year) {

            var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(year);

            if(!sheet){
                callback("Error, missing " + year);
                return;
            }


            var lastStudent = sheet.getRange("A1:A").getValues().filter(String).length;

            for(var i = 3; i <= lastStudent; i++){

                var lines = sheet.getRange(i, 1).getValue().split(';').filter(Boolean);

                lines.forEach(
                    function (line){

                        var name = line;

                        var obj = {
                            type: "student",
                            name: name,
                            get: {}
                        };

                        students.push(obj);
                    }
                );


            }
        }
    );
}