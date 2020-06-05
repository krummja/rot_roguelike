import { Mixin } from 'ts-mixer';


class Foo
{
  public makeFoo(): string {
    console.log("foo");
    return 'foo';
  }
}

class Bar
{
  public makeBar(): string {
    console.log("bar");
    return 'bar';
  }
}

class FooBar extends Mixin(Foo, Bar)
{
  
}


let foobar = new FooBar();


foobar.makeFoo();
foobar.makeBar();