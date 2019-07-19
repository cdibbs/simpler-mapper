[![npm version](https://badge.fury.io/js/simple-mapper.svg)](https://badge.fury.io/js/simple-mapper)
[![Build Status](https://travis-ci.org/ossplz/simple-mapper.svg?branch=master)](https://travis-ci.org/ossplz/simple-mapper)
[![dependencies Status](https://david-dm.org/ossplz/simple-mapper/status.svg)](https://david-dm.org/ossplz/simple-mapper)
[![devDependencies Status](https://david-dm.org/ossplz/simple-mapper/dev-status.svg)](https://david-dm.org/ossplz/simple-mapper?type=dev)
[![codecov](https://codecov.io/gh/ossplz/simple-mapper/branch/master/graph/badge.svg)](https://codecov.io/gh/ossplz/simple-mapper)
[![Greenkeeper badge](https://badges.greenkeeper.io/ossplz/simple-mapper.svg)](https://greenkeeper.io/)

# Simpler Mapper

A recursive object-to-object mapper with optional mapping profiles.

 - For straight name-for-name mapping, no profile is needed.
 - When you want to specify different source or destination names, value transformations,
   beforeMap or afterMap callbacks, then you can use a profile.

Mapping profiles can be specified inline:

```typescript
// assumes class Accountant { ... } exists:
let mapper = new Mapper();
let mappingProfile = { exceptions: { homePhone: "cellPhone", fullname: p => p.First + " " + p.Last } };
let accountant = mapper.map(person, Accountant, mappingProfile);
```

Or, you can implement `MapperProfile<TSource, TDest>` [see interface][mp] to improve maintainability:

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

In fact, a project can have many such mapping profiles, and they can inherit or
be composed from each other to ease your workload.

Beyond lambdas and property name overrides, you can also specify beforeMap and afterMap callbacks:

```typescript
let mapper = new Mapper();
let mappingProfile = { afterMap: (src, dest, p) => dest["key"] = "val" };
let accountant = mapper.map(person, Accountant, mappingProfile);
```

That's about it. Personally, this is all I've needed. Just how simple is Simpler Mapper?
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
