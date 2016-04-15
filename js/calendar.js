
var starting_day;
var marked = false;
var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var Calendar = function(divId, month, year, starting_day) {
			this.starting_day = starting_day;
			//Store div id
			this.divId = divId;
			
			// Days of week, starting on Sunday
			this.DaysOfWeek = [
				'Sun',
				'Mon',
				'Tue',
				'Wed',
				'Thu',
				'Fri',
				'Sat'
			];
			
			this.Months = Months;
			
			this.CurrentMonth = month;
			this.CurrentYear = year;
			
		};
		
		// Goes to next month
		Calendar.prototype.nextMonth = function() {
			if ( this.CurrentMonth == 11 ) {
				this.CurrentMonth = 0;
				this.CurrentYear = this.CurrentYear + 1;
			}
			else {
				this.CurrentMonth = this.CurrentMonth + 1;
			}
			this.showCurrent();
		};
		
		
		// Show current month
		Calendar.prototype.showCurrent = function() {
			this.showMonth(this.CurrentYear, this.CurrentMonth);
		};
		
		// Show month (year, month)
		Calendar.prototype.showMonth = function(y, m) {
			
			var d = new Date()
				// First day of the week in the selected month
				, firstDayOfMonth = new Date(y, m, 1).getDay()
				// Last day of the selected month
				, lastDateOfMonth =  new Date(y, m+1, 0).getDate()
				// Last day of the previous month
				, lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
				
			
			var html = '<div class="panel panel-default"><div class="panel-heading">Calendar</div><table class="table">';
			
			// Write selected month and year
			html += '<tr><td colspan="7">' + this.Months[m] + ' - ' + y + '</td></tr>';
			
			// Write the header of the days of the week
			html += '<tr>';
			for(var i=0; i < this.DaysOfWeek.length;i++) {
				html += '<td>\t' + this.DaysOfWeek[i] + ' </td>';
			}
			html += '</tr>';
			
			// Write the days
			var i=1;

			do {
				
				var dow = new Date(y, m, i).getDay();
				
				// If Sunday, start new row
				if ( dow == 0 ) {
					html += '<tr>';
				}
				// If not Sunday but first day of the month
				// it will write the last days from the previous month
				else if ( i == 1 ) {
					html += '<tr>';
					var k = lastDayOfLastMonth - firstDayOfMonth+1;
					for(var j=0; j < firstDayOfMonth; j++) {
						html += '<td class="not-current" style="background-color: #999"></td>';
						k++;
					}
				}
				// Write the current day in the loop
				if ( parseInt(this.starting_day) === i && $('.initial_day').length === 0) 
				{
					html += '<td class="current_day initial_day" style="background-color: #A94442">' + i + '</td>';
					marked = true;
				}else{
					marked = true;
					html += '<td class="current_day">' + i + '</td>';
				}
				
				// If Saturday, closes the row
				if ( dow == 6 ) {
					html += '</tr>';
				}
				// If not Saturday, but last day of the selected month
				// it will write the next few days from the next month
				else if ( i == lastDateOfMonth ) {
					var k=1;
					for(dow; dow < 6; dow++) {
						html += '<td class="not-current" style="background-color: #999"></td>';
						k++;
					}
				}
				
				i++;
			}while(i <= lastDateOfMonth);
			
			// Closes table
			html += '</table></div>';
			
			// Write HTML to the div
			document.getElementById(this.divId).innerHTML = html;
		};
		
		// On Load of the window
		
		// Get element by id
		function getId(id) {
			return document.getElementById(id);
		}
	