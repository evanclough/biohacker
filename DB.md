## Current Dynamo Schemas

### compound
* id: String (uuidv4)
* name: String
* actions: List[Map]
    * action: String
    * citations: List[String]
    * description: String
* contraindications: List[Map]
    * citations: List[String]
    * description: String
    * name: String
* genetics: List[Map]
    * snp: String
    * effects: Map
        * citations: List[String]
        * description: String
        * name: String
* research: List[Map]
    * citation: String
    * title: String
    * summary: String
* tags: List[String]
* description: 
    * summary: String
    * moa: String
* parents: List[Map]
    * id: String
    * name: String
* children: List[Map]
    * id: String
    * name: String

### compound_comments
* id: String (uuidv4)
* compoundId: String
* userId: String
* otherStuff: Map (for potential other things I missed rihgt now bc reconfiguring after the fact is a pain)
* tags: List[String]
* ratings: List[Map]
    * effect: String
    * rating: Number
    * reasoning: String
* text: String
* timestamp: String (unix millies)
* upvotes: Number

### stacks
* id: String (uuidv4)
* userId: String
* name: String  
* compounds: List[Map]
    * compoundId: String
    * dose: String
    * frequency: String
    * purpose
* info: Map
* tags: List[String]
* timestamp: String (unix millies)
* upvotes: Number

### stacks_comments
* id: String (uuidv4)
* userId: String
* stackId: String
* otherStuff: Map
* tags: List[String]
* ratings: List[Map]
    * effect: String
    * rating: Number
    * reasoning: String

* text: String
* timestamp: String (unix millies)
* upvotes: Number

### snp
* id: String (SNPid)
* gene: String
* alleles: List[Map]
    * bases: List[String] (A|T|C|G)
    * reference: Boolean (isReferenceAllele)
    * summary: String
* associatedCompounds: List[Map]
    * citation: String
    * compoundId: String
    * effect: String
* description: Map
    * TBD
* research: List[Map]
    * citation: String
    * title: String
    * summary: String

### users
* id: String(uuid)
* name: String
* username: String
* email: String
* accountCreationTimestamp: String (unix millies)
* verified: Boolean
* tags: List[String]
* demographics: Map
    * age: Number
    * weight: Number (kg)
    * height: Number (cm)
 * genetics: List[Map]
        * snp: String
        * bases: List[String] (A|T|C|G)
        * variant: String
