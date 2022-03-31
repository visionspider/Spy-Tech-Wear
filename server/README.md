# Backend

You should document your endpoints in this file.
Backend: the res will always have this structure

```json
res={status:number, data:[ ], message:""}

endpoint(get):providing data for all items.
.get("/api/get-items", getItems)

endpoint(get):providing data for companies.
.get("/api/get-companies",getCompanies)

endpoint(get):providing data for a specified item.
.get("/api/get-items/:itemId",getItem)

endpoint(get):providing data for a specified company.
.get("/api/get-companies/:companyId",getCompany)

endpoint(patch):Updating the database as users make purchases .
.patch("/api/update-items",updateItems)
Expected body from FE is [{_id : firstItemId, quantity: number},{_id: secondItemId, quantity: number}, ...]
For example : [{_id:6543,quantity:1},{_id:6544,quantity:2},{_id:6545,quantity:1}]
If there is an error, the backend will send an error message and do nothing with the database. For example: a user submitted an order which has 3 items associated with corresponding quantity. Only the 3rd item we don't have enough quantity for it. the backend will throw an error and reject updates for all three items.
{
"status": 500,
"message": "the remaining quantity for item 6543 \"Barska GB12166 Fitness Watch with Heart Rate Monitor\" is 3 , but required quantity is 11"
}
```
