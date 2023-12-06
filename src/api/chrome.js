export const getTabsByQuery = (queryOptions)=> {
    return new Promise(resolve => {
        chrome.tabs.query(queryOptions, resolve);
    });
}

export const sendMessageToRuntime = (parameters) => {
    return new Promise(resolve => {
       chrome.runtime.sendMessage(parameters, resolve)
    })
}

export const chromeStorageGetPromise = (values) => {
    return new Promise(resolve => {
        chrome.storage.sync.get(values, resolve);
    });
}

export const chromeStorageSetPromise = (values) => {
    return new Promise(resolve => {
        chrome.storage.sync.set(values, resolve);
    });
}