# Chronos
A very simple React component that renders a timer or a countdown depending on the prop.


# Description
```
A component to be used to track the time of phone calls (this is the purpose I built it), pause countdowns, and whatever else you need to keep a visual tracking of time.
Contains one or two props.
type -> string -> Accepts "countdown" or "timer".
from -> number (Only if the type is "countdown").

```

#Example
```
import Chronos from './path/Chronos.js';

On your render function:
<Chronos type={"timer"} />

Or:

<Chronos type={"countdown"} from={1}  />
```
