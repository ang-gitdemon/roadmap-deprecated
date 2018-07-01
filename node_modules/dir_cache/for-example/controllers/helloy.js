/**
 * Created by igor on 01.10.16.
 */

var list = {
	helloy : {
		method : (req, res) => {
			res.render('helloy');
		},
		title : 'Helloy',
		showInMenu : true,
		dropmenu : false
	},
	helloy2 : {
		method : (req, res) => {
			res.render('helloy/index');
		},
		title : 'Helloy2',
		showInMenu : true,
		dropmenu : false
	}
};

module.exports = () =>  {
	console.log('Be call');
	return list;
}

