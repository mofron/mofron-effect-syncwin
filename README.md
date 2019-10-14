# mofron-effect-syncwin
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

synchronize component with window

target component size is changed even if the window size is changed.


# Install
```
npm install mofron mofron-effect-syncwin
```

# Sample
```html
<require>
    <tag module="mofron-effect-syncwin">SyncWin</tag>
</require>

<div baseColor="#f0e6fa" effect=SyncWin()>
</div>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
|◯| valid | boolean | valid flag for horizon |
| | | boolean | valid flag for vertical |
|◯| offset | string (size) | horizon offset size |
| | | string (size) | vertical offset size |

