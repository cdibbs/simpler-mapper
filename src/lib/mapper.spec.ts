import { TestFixture, Setup, Test, Expect, Any } from 'alsatian';
import { Assert } from 'alsatian-fluent-assertions';
import { Mapper } from './mapper';

@TestFixture("Mapper")
export class MapperTests {
    _mapper: Mapper;

    @Setup
    public setup() {
        this._mapper = new Mapper();
    }

    @Test("mapOnto() Should copy only properties that exist on both.")
    public mapOnto_noProfile_deepCopies() {
        let src: any = {
            name: "something",
            deepen: {
                deeper: "meaning"
            }
        };
        let dest: any = {
            name: null,
            what: "should be ignored",
            deepen: {
                deeper: null
            }
        };

        const result = this._mapper.mapOnto(src, dest);
        Assert(result)
            .has(src)
            .has({
                what: "should be ignored"
            });
    }

    @Test("map() Should copy only properties that exist on both.")
    public map_noProfile_deepCopies() {
        let src: any = {
            name: "something",
            deepen: {
                deeper: "meaning"
            }
        };
        class Dest {
            name: string = null;
            what: string = "should be ignored"
            deepen: { deeper: string} = { deeper: null }
        }
        
        const result = this._mapper.map(src, Dest);
        Assert(result)
            .is(Dest)
            .has(src)
            .has({
                what: "should be ignored"
            });
    }
}