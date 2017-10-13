import ReactOnRails from 'react-on-rails';

import TodoList from '../bundles/HelloWorld/components/TodoList';
import Item from '../bundles/HelloWorld/components/Item';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  TodoList,
  Item
});
