var ss = SpreadsheetApp.getActiveSheet();
var sheet;

/**
 Default variable values.
 **/


//Compile.gs
//When a time object (period) is valid for both MYP and DP what should it say
var defaultTimeProgram = "All";



function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    var menu = ui.createMenu('Custom Tools')
    menu.addItem('Compile Calandar', 'CompileCalandar')
    menu.addItem('Verify Calendar', 'VerifyCalendar')
        .addSubMenu(ui.createMenu('Standardize')
            .addItem('Standardize Professors', 'StandardizeProf')
            .addItem('Standardize semicollon', 'StandardizeSemicollon')
            .addItem('Standardize Newline', 'StandardizeNewline')
        )
        .addToUi();
}



