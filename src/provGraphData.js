const provData1 = {
	nodes: [{ id: 'trial1', label: 'Trial 1', cat: 0, time: 0 }],
	links: [],
	numCats: 1,
	numTimes: 1,
};

const provData2 = {
	nodes: [
		...provData1.nodes,
		{ id: 'sow1', label: 'Sow', cat: 1, time: 1 },
		{ id: 'plot1', label: 'Plot 1', cat: 2, time: 1 },
		{ id: 'plot2', label: 'Plot 2', cat: 2, time: 1 },
		{ id: 'plot3', label: 'Plot 3', cat: 2, time: 1 },
		{ id: 'plot4', label: 'Plot 4', cat: 2, time: 1 },
		{ id: 'plot5', label: 'Plot 5', cat: 2, time: 1 },
		{ id: 'plot6', label: 'Plot 6', cat: 2, time: 1 },
		{ id: 'plot7', label: 'Plot 7', cat: 2, time: 1 },
		{ id: 'plot8', label: 'Plot 8', cat: 2, time: 1 },
		{ id: 'plot9', label: 'Plot 9', cat: 2, time: 1 },
		{ id: 'plot10', label: 'Plot 10', cat: 2, time: 1 },
	],
	links: [
		{ source: 'trial1', target: 'sow1', label: 'wasInformedBy' },
		{ source: 'sow1', target: 'plot1', label: 'wasGeneratedBy' },
		{ source: 'sow1', target: 'plot2' },
		{ source: 'sow1', target: 'plot3' },
		{ source: 'sow1', target: 'plot4' },
		{ source: 'sow1', target: 'plot5' },
		{ source: 'sow1', target: 'plot6' },
		{ source: 'sow1', target: 'plot7' },
		{ source: 'sow1', target: 'plot8' },
		{ source: 'sow1', target: 'plot9' },
		{ source: 'sow1', target: 'plot10' },
	],
	numCats: 3,
	numTimes: 2,
};

const provData3 = {
	nodes: [
		...provData2.nodes,
		{ id: 'harvest1', label: 'Harvest', cat: 1, time: 2 },
		{ id: 'seed1', label: 'Seed 1', cat: 2, time: 2 },
		{ id: 'seed2', label: 'Seed 2', cat: 2, time: 2 },
		{ id: 'seed3', label: 'Seed 3', cat: 2, time: 2 },
		{ id: 'seed4', label: 'Seed 4', cat: 2, time: 2 },
		{ id: 'seed5', label: 'Seed 5', cat: 2, time: 2 },
		{ id: 'seed6', label: 'Seed 6', cat: 2, time: 2 },
		{ id: 'seed7', label: 'Seed 7', cat: 2, time: 2 },
		{ id: 'seed8', label: 'Seed 8', cat: 2, time: 2 },
		{ id: 'seed9', label: 'Seed 9', cat: 2, time: 2 },
		{ id: 'seed10', label: 'Seed 10', cat: 2, time: 2 },
	],
	links: [
		...provData2.links,
		{ source: 'trial1', target: 'harvest1', label: 'wasInformedBy' },
		{ source: 'harvest1', target: 'seed1', label: 'wasGeneratedBy' },
		{ source: 'harvest1', target: 'seed2' },
		{ source: 'harvest1', target: 'seed3' },
		{ source: 'harvest1', target: 'seed4' },
		{ source: 'harvest1', target: 'seed5' },
		{ source: 'harvest1', target: 'seed6' },
		{ source: 'harvest1', target: 'seed7' },
		{ source: 'harvest1', target: 'seed8' },
		{ source: 'harvest1', target: 'seed9' },
		{ source: 'harvest1', target: 'seed10' },
		{ source: 'plot1', target: 'seed1', label: 'derivedFrom' },
		{ source: 'plot2', target: 'seed2' },
		{ source: 'plot3', target: 'seed3' },
		{ source: 'plot4', target: 'seed4' },
		{ source: 'plot5', target: 'seed5' },
		{ source: 'plot6', target: 'seed6' },
		{ source: 'plot7', target: 'seed7' },
		{ source: 'plot8', target: 'seed8' },
		{ source: 'plot9', target: 'seed9' },
		{ source: 'plot10', target: 'seed10' },
	],
	numCats: 3,
	numTimes: 3,
};

const provData4 = {
	nodes: [
		...provData3.nodes,
		{ id: 'trial2', label: 'Trial 2', cat: 0, time: 3 },
		{ id: 'sow2', label: 'Sow', cat: 1, time: 4 },
		{ id: 'plot11', label: 'Plot 11', cat: 2, time: 4 },
		{ id: 'plot12', label: 'Plot 12', cat: 2, time: 4 },
		{ id: 'plot13', label: 'Plot 13', cat: 2, time: 4 },
		{ id: 'plot14', label: 'Plot 14', cat: 2, time: 4 },
		{ id: 'plot15', label: 'Plot 15', cat: 2, time: 4 },
		{ id: 'plot16', label: 'Plot 16', cat: 2, time: 4 },
		{ id: 'plot17', label: 'Plot 17', cat: 2, time: 4 },
		{ id: 'plot18', label: 'Plot 18', cat: 2, time: 4 },
		{ id: 'plot19', label: 'Plot 19', cat: 2, time: 4 },
		{ id: 'plot20', label: 'Plot 20', cat: 2, time: 4 },
	],
	links: [
		...provData3.links,
		{ source: 'trial2', target: 'sow2', label: 'wasInformedBy' },
		{ source: 'sow2', target: 'plot11', label: 'wasGeneratedBy' },
		{ source: 'sow2', target: 'plot12' },
		{ source: 'sow2', target: 'plot13' },
		{ source: 'sow2', target: 'plot14' },
		{ source: 'sow2', target: 'plot15' },
		{ source: 'sow2', target: 'plot16' },
		{ source: 'sow2', target: 'plot17' },
		{ source: 'sow2', target: 'plot18' },
		{ source: 'sow2', target: 'plot19' },
		{ source: 'sow2', target: 'plot20' },
		{ source: 'seed1', target: 'plot11', label: 'derivedFrom' },
		{ source: 'seed2', target: 'plot12' },
		{ source: 'seed3', target: 'plot13' },
		{ source: 'seed4', target: 'plot14' },
		{ source: 'seed5', target: 'plot15' },
		{ source: 'seed6', target: 'plot16' },
		{ source: 'seed7', target: 'plot17' },
		{ source: 'seed8', target: 'plot18' },
		{ source: 'seed9', target: 'plot19' },
		{ source: 'seed10', target: 'plot20' },
	],
	numCats: 3,
	numTimes: 5,
};

export { provData1, provData2, provData3, provData4 };
