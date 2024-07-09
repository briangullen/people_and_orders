// Reports on people collection:
// Question 1: Average age
db.people.aggregate([{$group: {_id: null, averageAge: {$avg: '$age'}}}])

// Question 2: Average age by gender
db.people.aggregate([{$group: {_id: '$gender', averageAge: {$avg: '$age'}}}])

// Question 3: Number of people by gender
db.people.aggregate([{$group: {_id: '$gender', count: {$count: {}}}}])

// Question 4: 3 Oldest People
db.people.aggregate([{$sort: {age: -1}}, {$limit: 3}])

// Question 5: 5 youngest people, display only their names as one value (first + " " + last) and their ages
db.people.aggregate([{$sort: {age: 1}}, {$limit: 5}, {$project: {name: {$concat: ['$first_name', ' ', '$last_name']}, age: true, _id: false}}])

// Question 6: Average number of children
db.people.aggregate([{$group: {_id: null, avgChildren: {$avg: {$size: '$children'}}}}])

// Question 7: Name and age of children in Michigan who are under age ten
db.people.aggregate([{$unwind: '$children'}, {$match: {state: 'Michigan', 'children.age': {$lt: 10}}}, {$project: {'children.name': true, 'children.age': true, _id: false}}])

// Question 8: Average age of child by state, sorted with oldest first
db.people.aggregate([{$unwind: '$children'}, {$group: {_id: '$state', avgAge: {$avg: '$children.age'}}}, {$sort: {avgAge: -1}}])

// Reports on orders collection:
// Question 9: Find the total dollar amount of all sales ever. Use the total field.
db.orders.aggregate([{$group: {_id: null, total: {$sum: '$total'}}}])

// Question 10: Find the total dollar amount of sales on 2017-05-22. Use the total field.
db.orders.aggregate([{$match: {date: '2017-05-22'}}, {$group: {_id: null, total: {$sum: '$total'}}}])

// Quesiton 11: Find the date with the greatest number of orders. Include the date and the number of orders.
db.orders.aggregate([{$group: {_id: '$date', totalOrd: {$count: {}}}}, {$sort: {totalOrd: -1}}, {$limit: 1}])

// Quesiton 12: Find the date with the greatest total sales. Include the date and the dollar amount for that day.
db.orders.aggregate([{$group: {_id: '$date', totalSales: {$sum: '$total'}}}, {$sort: {totalSales: -1}}, {$limit: 1}])

// Question 13: Find the top three products that have had the greatest number sold. Include product name and number sold
db.orders.aggregate([{$unwind: '$items'}, {$group: {_id: '$items.product', totalSold: {$sum: '$items.count'}}}, {$sort: {totalSold: -1}}, {$limit: 3}])

// Question 14: Find the top item that has the greatest revenue (number sold * price). Include product name and dollar amount of sales.
db.orders.aggregate([{$unwind: '$items'}, {$group: {_id: '$items.product', revenue: {$sum: {$multiply: ['$items.price', '$items.count']}}}}, {$sort: {revenue: -1}}, {$limit: 1}])
