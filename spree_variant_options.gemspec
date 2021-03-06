# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "spree_variant_options/version"

Gem::Specification.new do |s|
  s.name        = "spree_variant_options"
  s.version     = SpreeVariantOptions::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Spencer Steffen", "Stephane Bounmy"]
  s.email       = ["spencer@citrusme.com", 'stephanebounmy@gmail.com']
  s.homepage    = "https://github.com/citrus/spree_variant_options"
  s.summary     = %q{Spree Variant Options is a simple spree extension that replaces the radio-button variant selection with groups of option types and values.}
  s.description = %q{Spree Variant Options is a simple spree extension that replaces the radio-button variant selection with groups of option types and values. Please see the documentation for more details.}

  s.rubyforge_project = "spree_variant_options"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # Runtime
  spree_version = '~> 2.4.0.beta'
  s.add_dependency 'spree_api', spree_version
  s.add_dependency 'spree_core', spree_version
  s.add_dependency 'spree_frontend', spree_version
  s.add_dependency 'spree_backend', spree_version

  # Development
  s.add_development_dependency('spree_sample',     spree_version)
  s.add_development_dependency('dummier',          '~> 0.3.2')
  s.add_development_dependency('shoulda',          '~> 3.5.0')
  s.add_development_dependency('shoulda-context',  '~> 1.2.1')
  s.add_development_dependency('shoulda-matchers', '~> 2.6.1')
  s.add_development_dependency('rspec-rails', '~> 3.0.1')
  s.add_development_dependency('pry', '~> 0.10.0')
  s.add_development_dependency('m')
  s.add_development_dependency('factory_girl_rails', '~> 4.4.1')
  s.add_development_dependency('cucumber-rails',   '~> 1.4.1')
  s.add_development_dependency('database_cleaner', '~> 1.2.0')
  s.add_development_dependency('sqlite3',          '~> 1.3.0')
  s.add_development_dependency('coffee-rails',     '~> 4.0.1')
  s.add_development_dependency('capybara')
  s.add_development_dependency('launchy')
  s.add_development_dependency("selenium-webdriver", '2.42.0')
  s.add_development_dependency("sprockets", '2.12.1')
end
