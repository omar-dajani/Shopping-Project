const { getActiveElement } = require('@testing-library/user-event/dist/utils');
var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
const cors = require('cors');

// GraphQL Schema
var schema = buildSchema(`
   type Query {
        item(id: Int!): Item
        items: [Item]
   }
   type Mutation {
       updateStock(id: Int!, payload: Int!): Item
   }
   type Item {
        id: Int
        title: String
        description: String
        stock: Int
   }
`)

var shoppingData = [
     {
         id: 0,
         title: 'Orange',
         description: 'Freshly stocked oranges!',
         stock: 5
     },
     {
        id: 1,
        title: 'Banana',
        description: 'Get 50% off all bananas',
        stock: 5
    },
    {
        id: 2,
        title: 'Mango',
        description: 'Fresh mangos :o',
        stock: 5
    }
]

var getItem = function(args) {
    var id = args.id;
    return shoppingData.filter(course => {
        return course.id == id;
    })[0]
}

var getItems = function(args) {
    return shoppingData;
}

var updateStock = function(args) {
    shoppingData.map(item => {
        if (item.id === args.id) {
            item.stock = item.stock - args.payload;
            return item;
        }
    });

    return shoppingData[args.id]
}

var root = {
    item: getItem,
    items: getItems,
    updateStock: updateStock
}

var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening on port 4000");
});