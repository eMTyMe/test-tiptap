console.log('data', {{data}});
if ({{module}}) console.log('module data', {{module?.data}});
return { calls: ({{actions.newAction.data?.calls}} || 0) + 1 }