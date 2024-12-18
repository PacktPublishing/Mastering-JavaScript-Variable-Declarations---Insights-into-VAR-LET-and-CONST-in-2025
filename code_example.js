const fname = "Clyde";

function greet() {
    let msg1 = "Hello";
    var msg2 = "There";
    alert(msg1 + msg2 + fname);
};

greet();

// PSEUDO CODE 👇

// 1️⃣ CREATION PHASE
// step 1: set up environments
globalExecutionContext = new ExecutionContext()
ExecutionStack.push(globalExecutionContext)

globalEnvironmentRecord = new GlobalEnvironmentRecord()
objectEnvironmentRecord = new ObjectEnvironmentRecord()
declarativeEnvironmentRecord = new DeclarativeEnvironmentRecord()

// set up the global realm
realm = new RealmRecord()
realm.[[GlobalEnv]] = GlobalEnvironmentRecord
realm.[[GlobalObject]] = window
globalExecutionContext.realm = realm

// set up global env records and VarNames
globalEnvironmentRecord.[[ObjectRecord]] = objectEnvironmentRecord
globalEnvironmentRecord.[[DeclarativeRecord]] = declarativeEnvironmentRecord
globalEnvironmentRecord.[[OuterEnv]] = null
globalEnvironmentRecord.[[VarNames]] = []

// set lexical & variable environmnet
globalExecutionContext.LexicalEnvironment = globalEnvironmentRecord
globalExecutionContext.VariableEnvironment = globalEnvironmentRecord

// step 2: set up bindings (hoisting)
// set up variables in memory (HOISTING)
globalExecutionContext.LexicalEnvironment.[[DeclarativeRecord]].createImmutableBinding("fname")
globalExecutionContext.LexicalEnvironment.[[ObjectRecord]].createMutableBinding("greet")
globalExecutionContext.LexicalEnvironment.[[ObjectRecord]].initializeBinding("greet", `<greet function object>`)
globalEnvironmentRecord.[[VarNames]].push("greet")

`<greet function object>`.[[Environment]] = globalExecutionContext.LexicalEnvironment;
`<greet function object>`.[[Realm]] = globalExecutionContext.realm
// ...

// 2️⃣ EXECUTION CONTEXT
// assignment
globalExecutionContext.LexicalEnvironment.[[DeclarativeRecord]].initializeBinding("fname", "Clyde");

// call our greet() function
greet = globalExecutionContext.LexicalEnvironment.[[ObjectRecord]].getBindingValue("greet")

greet.[[Call]]() // a new function execution context is created
        // 1️⃣ CREATION PHASE
        // step 1: create environments and record

        // create new execution context for the function
        FunctionExecutionContext = new ExecutionContext()
        // push the function context to top of the call stack
        ExecutionStack.push(FunctionExecutionContext)
        // craeate a function environment record to store and manage all bindings inside of function
        FunctionEnvironmentRecord = new FunctionEnvironmentRecord()
        FunctionExecutionContext.LexicalEnvironment = FunctionEnvironmentRecord
        FunctionExecutionContext.VariableEnvironment = FunctionEnvironmentRecord
        
        // set [[OuterEnv]] field property
        FunctionEnvironmentRecord.[[OuterEnv]] = greet.[[Environment]]

        // step 2: create bindings (hoisting)
        FunctionExecutionContext.LexicalEnvironment.createMutableBinding("msg1")
        FunctionExecutionContext.VariableEnvironment.createMutableBinding("msg2")

        // 2️⃣ EXECUTION PHASE
        // assignment
        FunctionExecutionContext.LexicalEnvironment.initializeBinding("msg1", "Hello");
        FunctionExecutionContext.VariableEnvironment.initializeBinding("msg2", "There");
        // execute alert(msg1 + msg2 + fname);
        // first, the JS parser will look for variable "msg1"
        FunctionExecutionContext.LexicalEnvironment.HasBinding("msg1") // yes
        msg1 = FunctionExecutionContext.LexicalEnvironment.getBindingValue("msg1")
        // second, the JS parser will look for variable "msg2"
        FunctionExecutionContext.VariableEnvironment.HasBinding("msg2") // yes
        msg2 = FunctionExecutionContext.VariableEnvironment.getBindingValue("msg2")

        // third, parser will look for variable "fname"
        FunctionExecutionContext.LexicalEnvironment.HasBinding("fname") // no
        FunctionExecutionContext.VariableEnvironment.HasBinding("fname") // no
        FunctionExecutionContext.LexicalEnvironment.[[OuterEnv]].[[DeclarativeRecord]].HasBinding("fname") ? // yes
        fname = FunctionExecutionContext.LexicalEnvironment.[[OuterEnv]].[[DeclarativeRecord]].getBindingValue("fname")

        // now the parser needs to find the host-defined "alert" function
        FunctionExecutionContext.LexicalEnvironment.HasBinding("alert") // no
        FunctionExecutionContext.LexicalEnvironment.[[OuterEnv]].[[DeclarativeRecord]].HasBinding("alert") // no
        FunctionExecutionContext.LexicalEnvironment.[[OuterEnv]].[[ObjectRecord]].HasBinding("alert") // yes
        alert = FunctionExecutionContext.LexicalEnvironment.[[OuterEnv]].[[ObjectRecord]].getBindingValue("alert")
        alert.[[Call]](msg1, msg2, fname)
        
        ExecutionStack.pop(FunctionExecutionContext);
    
// going back to global scope now
// nothing to execute, therefore its popped off the stack
ExecutionStack.pop(GlobalExecutionContext);