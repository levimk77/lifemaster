class User < ApplicationRecord
    has_many :events
    has_many :sage_advices
    has_many :days
    has_secure_password
end
