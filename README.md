[![npm version](https://badge.fury.io/js/simpler-mapper.svg)](https://badge.fury.io/js/simpler-mapper)
[![Build Status](https://travis-ci.org/cdibbs/simpler-mapper.svg?branch=master)](https://travis-ci.org/cdibbs/simpler-mapper)
[![dependencies Status](https://david-dm.org/cdibbs/simpler-mapper/status.svg)](https://david-dm.org/cdibbs/simpler-mapper)
[![devDependencies Status](https://david-dm.org/cdibbs/simpler-mapper/dev-status.svg)](https://david-dm.org/cdibbs/simpler-mapper?type=dev)
[![codecov](https://codecov.io/gh/cdibbs/simpler-mapper/branch/master/graph/badge.svg)](https://codecov.io/gh/cdibbs/simpler-mapper)
[![Greenkeeper badge](https://badges.greenkeeper.io/cdibbs/simpler-mapper.svg)](https://greenkeeper.io/)

# Simpler Mapper

A recursive, object-to-object mapper with optional mapping profiles.

 - For straight name-for-name mapping, no profile is needed.
 - Use a profile for:
   - specifying different source or destination names,
   - value transformations,
   - **beforeMap** or **afterMap** callbacks.

## Usage

Basic usage with a mapping profile:

```typescript
import { Mapper } from 'simpler-mapper';

// assumes class Accountant { ... } exists:
let mappingProfile = { exceptions: { homePhone: "cellPhone", fullname: p => p.First + " " + p.Last } };
let mapper = new Mapper();
let accountant = mapper.map(person, Accountant, mappingProfile);
```

Or, you can implement the `MapperProfile<TSource, TDest>` [interface][mp] to improve maintainability:

```typescript
class MyProfile implements MapperProfile<Person, Accountant> {
    exceptions = {
        homePhone: "cellPhone" as keyof Person,
        fullName: (p: Person) => p.First + " " + p.Last
    };

    beforeMap(src: Person): Accountant {
        const a = new Accountant(src);
        // ...super custom stuff...
        return a;
    }
}
let mappingProfile = new MyProfile();
```

In fact, a project can have many such mapping profiles, and they can inherit from ([or
be composed of][composition]) each other to ease your workload.

Beyond lambdas and property name overrides, you can also specify beforeMap and afterMap callbacks:

```typescript
let mapper = new Mapper();
let mappingProfile = { afterMap: (src, dest, p) => dest["key"] = "val" };
let accountant = mapper.map(person, Accountant, mappingProfile);
```

That's about it. Personally, this is all I've needed. Just how much simpler is Simpler Mapper?
It's [one class][mapper], an [interface][mp], and [three][hook] [type definitions][excep].

## Installation

`npm install --save-dev simpler-mapper`

## History

Q: Didn't you already make a mapper?

A: Yes, but it wasn't simple/effective enough. It relied on annotations
   and wasn't very flexible.

[mp]: /src/lib/models/mapper-profile.ts
[mapper]: /src/lib/mapper.ts
[hook]: /src/lib/models/mapping-hook.ts
[excep]: /src/lib/models/mapping-exceptions.ts
[composition]: https://en.wikipedia.org/wiki/Composition_over_inheritance
