require 'rubygems'
require 'closure-compiler'

desc "Use the Closure Compiler to compress .js"
task :build do
  js = File.open('jquery.compactors-0.0.1.js', 'r')
  min = Closure::Compiler.new.compile(js)
  File.open('jquery.compactors-0.0.1.min.js', 'w') {|f| f.write(min) }
end


