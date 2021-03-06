# Implementation topics

Here is some information on extending the HomeDing library by implementing new elements.


## Create a new Element implementation

In the development example you can find a Element called "TemplateElement" that contains all function declarations, empty function implementation for an element that does nothing and some additional information as comments that help implementing new Elements.

The 2 files (TemplateElement.*) can be copied and renamed and the class name should be adjusted as well to create a new element not doing anything yet.

You can then start implementing the minimal things:

* Initializing the element properties for taking configuration values into private variables in the `set(name, value)` method.
* Starting operation mode in the `start()` method. This may include initializing GPIO signals, sensors or other external chips.  
* Operate in the `loop()` method. Be sure that loop() execution must not consume much time to support the cooperative multitasking. 

More details about the Element Class implementation and the other available methods can be found in [Element Class](elementclass.md) description.


## Element registration

The Element Registry knows all element classes that are available in the firmware to be activated by using the configuration.
Under normal conditions yu have to specify a short element name when calling `registerElement` in:

    bool TemplateElement::registered =
    ElementRegistry::registerElement("template", TemplateElement::create);

Details on the Registry can be found in the [Element Registry](ElementRegistry.md) documentation.


## Element Card

Every time a element is displayed on the board a `card` template is used to display the element in a proper way.

There is a generic implementation that displays the `value` only.

For some elements very specific `cards` are implemented in the files `board.htm` and `board-templates.htm`.

Here you can add new templates for specific elements instead of using the `generic` template.


## Element Meta data

For new elements the list of properties, actions and events should be specified in the `elements.json` file that is saved on the device.

This file is the basis for the `Add a new element` dialog in the board implementation.

* **Properties** are implemented in the `set(name, value)` method to get the configuration values.
* **Actions** are also implemented in the `set(name, value)` method but are expected to be used at runtime by incoming actions.
* **Events** are outgoing actions to other elements.


## See also

- [Device Logging](logger.md)