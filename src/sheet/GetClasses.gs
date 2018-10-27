
var classes = [];
function GetClasses(){

    var year;

    LineByLine(
        function (line, day, i, j){
            var subject = line.split(/[\<\(]+/)[0].trim().replace(/\s/g, "_");

            var teacher = line.match(/<(.*?)>/g);
            if (teacher){
                teacher = teacher[0].trim().slice(1, -1).replace(/\s/g, "_");
            }

            var room = line.match(/\((.*?)\)/g);
            if (room){
                room = room[0].trim().slice(1, -1).replace(/\s/g, "_");
            }


            var serchPeriod = parsePeriod(sheet.getRange(i, 1).getValue());


            var newYear = sheet.getRange(1, i).getValue();

            if (newYear) year = newYear;

            var yearGroup = sheet.getRange(2, i).getValue();

            classes.push(
                {
                    type: "class",
                    year_group: year + '_' + yearGroup,
                    subject: subject,
                    room: room,
                    period: pDic[serchPeriod.time + serchPeriod.program],
                    students: null,
                    teacher: teacher
                }
            );
        }
    )

    return classes;
}

