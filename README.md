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
    <tag load="mofron-effect-syncwin">SyncWin</tag>
</require>

<div color2="#f0e6fa" effect=SyncWin>
</div>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | valid | boolean | valid flag for horizon |
| | | boolean | valid flag for vertical |
| | x_valid | boolean | true: enabled horizonal sync [default] |
| | | | false: disabled horizonal sync |
| | | | undefined: call as getter |
| | y_valid | boolean | true: enabled vertical sync [default] |
| | | | false: disabled vertical sync |
| | | | undefined: call as getter |
| ◯  | offset | string (size) | horizonal offset size |
| | | string (size) | vertical offset size |
| | x_offset | string(size) | horizonal offset size |
| | y_offset | string(size) | vertical offset size |

