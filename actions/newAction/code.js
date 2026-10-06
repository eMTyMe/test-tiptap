console.log('data', {{data}});
console.log('module data', {{module?.data}});
return { calls: ({{actions.newAction.data?.calls}} || 0) + 1 }